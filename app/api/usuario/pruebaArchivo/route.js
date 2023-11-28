// api/upload.js
import { NextResponse } from "next/server";
import {writeFile, mkdir} from 'fs/promises'
import path from "path";
//import { writeFile } from "fs";

export async function POST(req, res) {
    try {
        
        const data = await req.formData()
        const file = data.get('file')
        //console.log(file)
        const bytesFile = await file.arrayBuffer()
        const bufferFile = Buffer.from(bytesFile)
        
        const directoryPath = path.join(process.cwd(), '/app/resources');
        const filePath = path.join(directoryPath, file.name);

        // Crea el directorio si no existe
        await mkdir(directoryPath, { recursive: true });

        await writeFile(filePath, bufferFile);

        //return NextResponse.json(JSON.stringify({ message: 'Archivo recibido exitosamente' }));
        return new Response(JSON.stringify({
            message:'uplading'
        }))
    } catch (error) {
        console.log(error)
        console.error('Error al procesar el archivo:', error);
        return NextResponse.error(error.message, { status: 500 });
    }
}

