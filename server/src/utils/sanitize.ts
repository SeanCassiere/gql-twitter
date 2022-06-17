// sanitize a username
export function sanitizeUsername(username: string) {
	return username.replace(/[^a-zA-Z0-9_]/g, "");
}
