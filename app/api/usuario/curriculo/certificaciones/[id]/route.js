// pages/api/usuarios/experienciaLaboral.js
import { NextResponse } from "next/server";
import {writeFile, mkdir} from 'fs/promises'
import path from "path";
import prisma from "@/app/components/db";
import { data } from "autoprefixer";


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
        const nombreCertificadoUsr = data.get('nombreCertificado')
        const tipoCertificadoUsr = data.get('tipoCertificado')

        const body = {
          RFC: rfcUsr,
          nombreCertificado: nombreCertificadoUsr,
          tipoCertificado: tipoCertificadoUsr,
          certificado: null
        }

        const certificacion = await prisma.certificaciones.findUnique({
          where: { id: parseInt(id) },
        });



        console.log(certificacion)

        const certificadoNombre =  certificacion.certificado

        const directoryPath = path.join(process.cwd(), '/app/resources');
        const directoryUsrPath = path.join(directoryPath,user.id.toString(),'certificaciones')
        const filePath = path.join(directoryUsrPath, certificadoNombre);

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
        

        const updatedUser = await prisma.certificaciones.upsert({
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
      const nombreCertificadoUsr = data.get('nombreCertificado')
      const tipoCertificadoUsr = data.get('tipoCertificado')

      const id = params.id;
      

      const body = {
        RFC: rfcUsr,
        nombreCertificado: nombreCertificadoUsr,
        tipoCertificado: tipoCertificadoUsr,
        certificado: null
      }

      console.log(body)

      


      if(file != 'null'){
        console.log(file)
        body.certificado = file.name
        const bytesFile = await file.arrayBuffer()
        const bufferFile = Buffer.from(bytesFile)

        const directoryPath = path.join(process.cwd(), '/app/resources');
        const directoryUsrPath = path.join(directoryPath,user.id.toString(),'certificaciones')
        const filePath = path.join(directoryUsrPath, file.name);

        //const filePath = path.join(process.cwd(), '/app/resources', user.id.toString(), 'cursos', file.name);
        console.log(filePath)

        // Crea el directorio si no existe
        await mkdir(directoryPath, { recursive: true });
        await mkdir(directoryUsrPath, { recursive: true });

        await writeFile(filePath, bufferFile);
      } 


      const updatedUser = await prisma.certificaciones.upsert({
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

    const cert = await prisma.certificaciones.findUnique({
      where: { id: parseInt(id) },
    });

    if(cert){
      const user = await prisma.usrs.findUnique({
        where: { RFC: cert.RFC },
      });

      const certificadoNombre =  cert.certificado
      const directoryPath = path.join(process.cwd(), '/app/resources');
      const directoryUsrPath = path.join(directoryPath,user.id.toString(),'certificaciones')
      const filePath = path.join(directoryUsrPath, certificadoNombre);

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
    }
    const deletedUser = await prisma.certificaciones.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json(deletedUser);
  } catch (error) {
    console.log(error)
    return NextResponse.error(error.message, { status: 500 });
  }
}
