export interface ValidationResult {
    valid: boolean;
    errors: string[];
}
/**
 * Validate a plugin object.
 * Supports both ireader-next format (with info property) and IReader format.
 */
export declare function validatePlugin(plugin: unknown): ValidationResult;
//# sourceMappingURL=validator.d.ts.map