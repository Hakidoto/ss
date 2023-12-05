import { NextResponse } from "next/server";

import { readFile } from 'fs/promises';
import path from 'path';

export async function POST(req, {params}) {
    try{
        const id = params.id;
        const body = await req.json();
        const data = { ...body };
        console.log(id)
        console.log(body)

        const cert = await prisma.cursos.findUnique({
            where: { id: parseInt(id) },
        });

        console.log(cert)
        var nombreArchivo = cert.certificado
        if(data.tipoCert == 'curso'){
            const buffer = await readFile(path.join(path.join(process.cwd() ,'\\app\\resources\\2\\cursos', nombreArchivo)));
            console.log(path.join(path.join(process.cwd() ,'\\app\\resources\\2\\cursos', nombreArchivo)))
            const headers = new Headers();
            headers.append('Content-Disposition', `attachment; filename="${nombreArchivo}"`);
            headers.append('Content-Type', 'application/pdf'); // Cambiado a 'application/pdf' para indicar que es un archivo PDF
            return new Response(buffer, {
              headers,
            });
        }

        
    }catch (error) {
        console.log(error)
        console.error('Error al procesar el archivo en el servidor:', error);
        return NextResponse.error(error.message, { status: 500 });
    } 
}