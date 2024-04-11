import qrcodegen from "./qrcodegen";

// adapted from https://github.com/nayuki/QR-Code-generator/blob/master/typescript-javascript/qrcodegen-input-demo.ts
// Returns a string of SVG code for an image depicting the given QR Code, with the given number
// of border modules. The string always uses Unix newlines (\n), regardless of the platform.
function toSvgString(
  qr: qrcodegen.QrCode,
  border: number,
  lightColor: string,
  darkColor: string
): string {
  if (border < 0) throw new RangeError("Border must be non-negative");
  let parts: Array<string> = [];
  for (let y = 0; y < qr.size; y++) {
    for (let x = 0; x < qr.size; x++) {
      if (qr.getModule(x, y))
        parts.push(`M${x + border},${y + border}h1v1h-1z`);
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 ${
    qr.size + border * 2
  } ${qr.size + border * 2}" stroke="none">
	<rect width="100%" height="100%" fill="${lightColor}"/>
	<path d="${parts.join(" ")}" fill="${darkColor}"/>
</svg>
`;
}

export function renderTextToElement(element: HTMLDivElement, content: string) {
  const code = qrcodegen.QrCode.encodeText(
    content,
    qrcodegen.QrCode.Ecc.MEDIUM
  );
  element.innerHTML = toSvgString(code, 2, "white", "black");
}
