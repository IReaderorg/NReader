#!/usr/bin/env bash
#
# install-all-lnreader-sources.sh
# Bulk install all 252 LNReader sources from the unminified repo manifest.
# Usage: cd ireader-next && bash scripts/install-all-lnreader-sources.sh
#
set -euo pipefail

BASE="${BASE_URL:-http://localhost:8080/api/v1}"
REPO="https://raw.githubusercontent.com/kazemcodes/lnreader-plugins-unminified/refs/heads/repo/plugins/plugins.min.json"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"

RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'; CYAN='\033[0;36m'; NC='\033[0m'
pass() { echo -e "${GREEN}[OK]${NC} $1"; }
fail() { echo -e "${RED}[FAIL]${NC} $1"; }
info() { echo -e "${CYAN}[INFO]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }

# Check server is alive
info "Checking server at ${BASE}/health..."
if ! curl -sf "${BASE}/health" > /dev/null 2>&1; then
  fail "Server not reachable at ${BASE}. Start the backend first."
  exit 1
fi
pass "Server is up"

# Fetch manifest
info "Fetching LNReader repo manifest..."
SOURCES_JSON=$(curl -sf "$REPO") || { fail "Failed to fetch $REPO"; exit 1; }
TOTAL=$(echo "$SOURCES_JSON" | python3 -c "import sys,json; print(len(json.load(sys.stdin)))")
info "Found ${TOTAL} sources in manifest"

# Use Python to iterate and call curl for each source (avoids bash IFS/space issues)
python3 -c "
import sys, json, subprocess, os

BASE = os.environ.get('BASE_URL', 'http://localhost:8080/api/v1')
sources = json.load(sys.stdin)
total = len(sources)
count = 0
failed = 0
skipped = 0
failed_list = []

for i, s in enumerate(sources):
    sid = s['id']
    url = s['url']
    name = s.get('name', sid)
    idx = i + 1

    # Check if already installed
    check = subprocess.run(
        ['curl', '-sf', f'{BASE}/sources/{sid}'],
        capture_output=True
    )
    if check.returncode == 0:
        print(f'[SKIP] [{idx}/{total}] {sid} ({name}) already installed')
        skipped += 1
        continue

    print(f'[{idx}/{total}] Installing {sid} ({name})... ', end='', flush=True)
    result = subprocess.run(
        ['curl', '-sf', '-X', 'POST', f'{BASE}/sources/install',
         '-H', 'Content-Type: application/json',
         '-d', f'{{\"url\": \"{url}\", \"id\": \"{sid}\"}}'],
        capture_output=True, text=True
    )
    if result.returncode == 0:
        print('done')
        count += 1
    else:
        print('failed')
        failed_list.append(sid)
        failed += 1

print()
print('=' * 50)
print('  LNReader Sources Bulk Install Complete')
print('=' * 50)
print(f'  Total in manifest:  {total}')
print(f'  Newly installed:    {count}')
print(f'  Already present:    {skipped}')
print(f'  Failed:             {failed}')
if failed_list:
    print('  Failed IDs:')
    for fid in failed_list:
        print(f'    - {fid}')
print('=' * 50)

sys.exit(0 if failed == 0 else 1)
" <<< "$SOURCES_JSON"

# Capture python exit code
PY_EXIT=$?

# Print colored summary based on exit code
if [ $PY_EXIT -eq 0 ]; then
  pass "All sources installed successfully"
else
  fail "Some sources failed to install (see above)"
fi

exit $PY_EXIT
