// pages/api/usuarios/experienciaLaboral.js
import { NextResponse } from "next/server";
import {writeFile, mkdir} from 'fs/promises'
import path from "path";
import prisma from "@/app/components/db";
import { data } from "autoprefixer";

export async function GET(req, {params}) {
  try {
    const rfc = params.rfc;
    const user = await prisma.cursos.findMany({
        where: {
          usuario: {
            rfc,
          },
        },
      });
    if (!user) {
      return NextResponse.error('Usuario no encontrado', { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.error(error.message, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const fs = require('fs');
    const data = await req.formData()

    const tipoCert = data.get('tipoCert')
    const rfcUsr = data.get('RFC')

    const user = await prisma.usrs.findUnique({
      where: { RFC: rfcUsr },
    });

    if (!user) {
        return new Response(JSON.stringify({ error: 'Usuario no encontrado' }), { status: 404 });
    }


    console.log(tipoCert)
    if(tipoCert == 'cursoDel'){
      try{
        const id = params.id;
        const nombreCursoUsr = data.get('nombreCurso')
        const tipoCursoUsr = data.get('tipoCurso')

        const body = {
          RFC: rfcUsr,
          nombreCurso: nombreCursoUsr,
          tipoCurso: tipoCursoUsr,
          certificado: null
        }

        const curso = await prisma.cursos.findUnique({
          where: { id: parseInt(id) },
        });



        console.log(curso)

        const cursoNombre =  curso.certificado

        const directoryPath = path.join(process.cwd(), '/app/resources');
        const directoryUsrPath = path.join(directoryPath,user.id.toString(),'cursos')
        const filePath = path.join(directoryUsrPath, cursoNombre);

        if (fs.existsSync(filePath)) {
          // Eliminar el archivo
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error(`Error al eliminar el archivo ${filePath}: ${err}`);
            } else {
              console.log(`Archivo ${filePath} eliminado con éxito`);
            }
          });
        } else {
          console.log(`El archivo ${filePath} no existe`);
        }

        const updatedUser = await prisma.cursos.upsert({
          where: { id: parseInt(id) },
          update: body,
          create: body,
        });

        //probar el delete delarchivo y actualizar la db
        return NextResponse.json(updatedUser);
      }catch(error){
        console.log(data)
        console.log(error)
        return NextResponse.error(error.message, { status: 500 });
      }
      
    }else{

      const file = data.get('file')
      const nombreCursoUsr = data.get('nombreCurso')
      const tipoCursoUsr = data.get('tipoCurso')

      const id = params.id;
      

      const body = {
        RFC: rfcUsr,
        nombreCurso: nombreCursoUsr,
        tipoCurso: tipoCursoUsr,
        certificado: null
      }

      console.log(body)

      


      if(file != 'null'){
        console.log(file)
        body.certificado = file.name
        const bytesFile = await file.arrayBuffer()
        const bufferFile = Buffer.from(bytesFile)

        const directoryPath = path.join(process.cwd(), '/app/resources');
        const directoryUsrPath = path.join(directoryPath,user.id.toString(),'cursos')
        const filePath = path.join(directoryUsrPath, file.name);

        //const filePath = path.join(process.cwd(), '/app/resources', user.id.toString(), 'cursos', file.name);
        console.log(filePath)

        // Crea el directorio si no existe
        await mkdir(directoryPath, { recursive: true });
        await mkdir(directoryUsrPath, { recursive: true });

        await writeFile(filePath, bufferFile);
      } 


      const updatedUser = await prisma.cursos.upsert({
        where: { id: parseInt(id) },
        update: body,
        create: body,
      });

      return NextResponse.json(updatedUser);
    }
    
  } catch (error) {
    console.log(data)
    console.log(error)
    return NextResponse.error(error.message, { status: 500 });
  }
}

export async function DELETE(req, { params }) {
  try {
    const fs = require('fs');
    const id = params.id;
    console.log("SSS")

    const cert = await prisma.cursos.findUnique({
      where: { id: parseInt(id) },
    });

    if(cert){
      const user = await prisma.usrs.findUnique({
        where: { RFC: cert.RFC },
      });

      if(cert.certificado){
        const cursoNombre =  cert.certificado
        const directoryPath = path.join(process.cwd(), '/app/resources');
        const directoryUsrPath = path.join(directoryPath,user.id.toString(),'cursos')
        const filePath = path.join(directoryUsrPath, cursoNombre);
        
        try{
          if (fs.existsSync(filePath)) {
            // Eliminar el archivo
            fs.unlink(filePath, (err) => {
              if (err) {
                console.error(`Error al eliminar el archivo ${filePath}: ${err}`);
              } else {
                console.log(`Archivo ${filePath} eliminado con éxito`);
              }
            });
          } else {
            console.log(`El archivo ${filePath} no existe`);
          }
        }catch(error){
          console.log("Ocurrio un error: ", error)
        }
      }
    }
    const deletedUser = await prisma.cursos.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.log(error)
    return NextResponse.error(error.message, { status: 500 });
  }
}