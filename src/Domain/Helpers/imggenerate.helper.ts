import { createHmac } from "crypto";

export default function GenerarImgPerfil(email: string) {
    const hash = createHmac('sha256', email)
               .update(email)
               .digest('hex');
    return "https://www.gravatar.com/avatar/"+hash+"?d=retro&f=y&s=128"
}