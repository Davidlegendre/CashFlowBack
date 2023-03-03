import { Response } from "express";
import { MensajeDTO } from "../DTOGlobal/MensajeModel";

export function SendResponse(
    {status, mensaje, Data}: MensajeDTO, res: Response)
{
    return res.status(status).json({status,mensaje, Data})
}