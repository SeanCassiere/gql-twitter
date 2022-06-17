export function toBase64(value: string) {
	const buffer = Buffer.from(value);
	return buffer.toString("base64");
}

export function fromBase64(value: string) {
	const buffer = Buffer.from(value, "base64");
	return buffer.toString();
}
