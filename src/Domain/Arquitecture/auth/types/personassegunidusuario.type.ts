import { Persona } from '../../../schemas/Persona-model';
export type PersonaSegunIDUsuarioType ={  
    paginacion: {
        Total_pagina: number,
        pagina_actual: number,
        Total_registros: number
        numero_por_pagina: number
    },
    data:{  
        dueño: {nombre: string, email: string, telefono: Number},
        Personas: Persona[]
    }
}