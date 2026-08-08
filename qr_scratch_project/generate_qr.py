"""
Generates the QR code that freshers will scan.

By default it points to your machine's local network IP so that phones on
the same WiFi can open it (localhost/127.0.0.1 won't work from a phone).

Run:
    python generate_qr.py

It creates: static/images/welcome_qr.png
"""

import socket
import qrcode


def get_local_ip():
    """Best-effort way to find this machine's LAN IP address."""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        # Doesn't actually send data, just used to pick the right interface
        s.connect(("8.8.8.8", 80))
        ip = s.getsockname()[0]
    except Exception:
        ip = "127.0.0.1"
    finally:
        s.close()
    return ip


def main():
    port = 5000
    local_ip = get_local_ip()
    url = f"http://{local_ip}:{port}/"

    print(f"Generating QR code for: {url}")
    print("(Make sure app.py is running and your phone is on the same WiFi)")

    qr = qrcode.QRCode(
        version=None,
        error_correction=qrcode.constants.ERROR_CORRECT_H,
        box_size=10,
        border=4,
    )
    qr.add_data(url)
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")
    output_path = "static/images/welcome_qr.png"
    img.save(output_path)

    print(f"QR code saved to: {output_path}")
    print("Open that image, print it or display it for freshers to scan!")


if __name__ == "__main__":
    main()
