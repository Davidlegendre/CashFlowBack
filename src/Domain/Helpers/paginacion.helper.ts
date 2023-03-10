import {Query } from 'mongoose';
import PaginacionDTO from '../Arquitecture/auth/dto/paginacion.dto';

export async function Paginar(document: Query<any[],any,any>, count: number, paginaciondto: PaginacionDTO){
          const skip = (paginaciondto.pagina&&paginaciondto.por_pagina)??(paginaciondto.pagina - 1) * paginaciondto.por_pagina
    

    const findQuery = document
    .skip(skip)
 
  if (paginaciondto.por_pagina && paginaciondto.por_pagina !== 0) {
    findQuery.limit(paginaciondto.por_pagina);
  }
  const results = await findQuery;
 
  const prepaginas = count / paginaciondto.por_pagina 
  const paginas = count % paginaciondto.por_pagina !== 0? prepaginas + 1: prepaginas
  return { paginas, count, results };
}