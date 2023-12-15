import { NextResponse } from "next/server";

import { readFile } from 'fs/promises';
import path from 'path';
import { stringify } from "querystring";

export async function POST(req, {params}) {
    try{
        const fs = require('fs');
        const id = params.id;
        const body = await req.json();
        const data = { ...body };
        const idUser = data.idUser
        console.log(id)
        console.log(body)

        if(data.tipoCert == 'curso'){

            const cert = await prisma.cursos.findUnique({
                where: { id: parseInt(id) },
            });
    
            console.log(cert)
            var nombreArchivo = cert.certificado

            try{
                const buffer = await readFile(path.join(path.join(process.cwd() ,'\\app\\resources', idUser.toString(),'cursos', nombreArchivo)));
                console.log(path.join(path.join(process.cwd() ,'\\app\\resources', idUser.toString(),'cursos', nombreArchivo)))
                const headers = new Headers();
                headers.append('Content-Disposition', `attachment; filename="${nombreArchivo}"`);
                headers.append('Content-Type', 'application/pdf'); // Cambiado a 'application/pdf' para indicar que es un archivo PDF
                return new Response(buffer, {
                  headers,
                });
            }catch(error){
                console.log(error)
                console.error('Error al procesar el archivo en el servidor:', error);
                return NextResponse.error(JSON.stringify({ error: 'Error al procesar el archivo en el servidor', details: error.message }), { status: 500 });
            }
            
        }

        if(data.tipoCert == 'certificado'){

            const cert = await prisma.certificaciones.findUnique({
                where: { id: parseInt(id) },
            });
    
            console.log(cert)
            var nombreArchivo = cert.certificado

            try{
                const buffer = await readFile(path.join(path.join(process.cwd() ,'\\app\\resources', idUser.toString(),'certificaciones', nombreArchivo)));
                console.log(path.join(path.join(process.cwd() ,'\\app\\resources', idUser.toString(),'certificaciones', nombreArchivo)))
                const headers = new Headers();
                headers.append('Content-Disposition', `attachment; filename="${nombreArchivo}"`);
                headers.append('Content-Type', 'application/pdf'); // Cambiado a 'application/pdf' para indicar que es un archivo PDF
                return new Response(buffer, {
                  headers,
                });
            }catch(error){
                console.log(error)
                console.error('Error al procesar el archivo en el servidor:', error);
                return NextResponse.error(JSON.stringify({ error: 'Error al procesar el archivo en el servidor', details: error.message }), { status: 500 });
            }
        }

        if(data.tipoCert == 'lengua'){

            const cert = await prisma.lenguas.findUnique({
                where: { id: parseInt(id) },
            });
    
            console.log(cert)
            var nombreArchivo = cert.certificado

            try{
                const buffer = await readFile(path.join(path.join(process.cwd() ,'\\app\\resources', idUser.toString(),'lenguas', nombreArchivo)));
                console.log(path.join(path.join(process.cwd() ,'\\app\\resources', idUser.toString(),'lenguas', nombreArchivo)))
                const headers = new Headers();
                headers.append('Content-Disposition', `attachment; filename="${nombreArchivo}"`);
                headers.append('Content-Type', 'application/pdf'); // Cambiado a 'application/pdf' para indicar que es un archivo PDF
                return new Response(buffer, {
                  headers,
                });
            }catch(error){
                console.log(error)
                console.error('Error al procesar el archivo en el servidor:', error);
                return NextResponse.error(JSON.stringify({ error: 'Error al procesar el archivo en el servidor', details: error.message }), { status: 500 });
            }
        }

        if(data.tipoCert == 'incapacidad'){

            const cert = await prisma.incapacidades.findUnique({
                where: { id: parseInt(id) },
            });
    
            console.log(cert)
            var nombreArchivo = cert.justificante

            try{
                const buffer = await readFile(path.join(path.join(process.cwd() ,'\\app\\resources', idUser.toString(),'incapacidades', nombreArchivo)));
                console.log(path.join(path.join(process.cwd() ,'\\app\\resources', idUser.toString(),'incapacidades', nombreArchivo)))
                const headers = new Headers();
                headers.append('Content-Disposition', `attachment; filename="${nombreArchivo}"`);
                headers.append('Content-Type', 'application/pdf'); // Cambiado a 'application/pdf' para indicar que es un archivo PDF
                return new Response(buffer, {
                  headers,
                });
            }catch(error){
                console.log(error)
                console.error('Error al procesar el archivo en el servidor:', error);
                return NextResponse.error(JSON.stringify({ error: 'Error al procesar el archivo en el servidor', details: error.message }), { status: 500 });
            }
        }

        
    }catch (error) {
        console.log(error)
        console.error('Error al procesar el archivo en el servidor:', error);
        return NextResponse.error(JSON.stringify({ error: 'Error al procesar el archivo en el servidor', details: error.message }), { status: 500 });
    } 
}