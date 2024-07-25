"use server"

import { OrderBill, OrderWithProducts } from "@/src/types";
import { transport } from "@/src/util/nodemailer"
import jsPDF from "jspdf";

type SendEmailProps = {
  orders: OrderWithProducts[];
  data: OrderBill;
};

export const sendEmail = async ({ orders, data }: SendEmailProps): Promise<{ success: boolean; message: string }> => {
  try {
    if (!orders || orders.length === 0) {
      throw new Error('No se han encontrado órdenes para enviar.');
    }
    if (!data || !data.emailClient) {
      throw new Error('Los datos de la factura o el correo electrónico del cliente no están completos.');
    }

    const pdfBuffer = await createPDF({ data, orders });

    const mailOptions = {
      from: 'tu-email@gmail.com',
      to: data.emailClient,
      subject: 'Factura Electrónica',
      text: 'Adjunto encontrarás tu factura electrónica.',
      attachments: [
        {
          filename: 'factura.pdf',
          content: pdfBuffer,
          contentType: 'application/pdf',
        },
      ],
    };

    await transport.sendMail(mailOptions);
    console.log('Correo electrónico enviado con éxito.');
    return { success: true, message: 'Correo electrónico enviado con éxito.' };
  } catch (error) {
    console.error('Error al enviar el correo electrónico:', (error as Error).message);
    return { success: false, message: `Error al enviar el correo electrónico: ${(error as Error).message}` };
  }
};

export const createPDF = ({ data, orders }: { data: OrderBill; orders: OrderWithProducts[] }): Buffer => {
  try {
    if (!data || !orders || orders.length === 0) {
      throw new Error('Datos de la factura o las órdenes incompletos.');
    }

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text('Factura Electrónica', 105, 20, { align: 'center' });

    doc.setFontSize(12);
    doc.text(`Número de factura: ${data.idBill}`, 20, 40);
    doc.text(`Fecha: ${data.fecha}`, 20, 50);
    doc.text(`Cliente: ${data.nameClient}`, 20, 60);
    doc.text(`Email: ${data.emailClient}`, 20, 70);

    doc.setLineWidth(0.5);
    doc.line(20, 75, 190, 75);

    doc.text('Descripción', 20, 85);
    doc.text('Cantidad', 120, 85);
    doc.text('Precio', 150, 85);
    doc.text('Total', 180, 85);
    doc.line(20, 90, 190, 90);

    let y = 100;
    orders.forEach(order => {
      order.orderProducts.forEach(product => {
        doc.text(product.product.name, 20, y);
        doc.text(String(product.quantity), 120, y);
        doc.text(String(product.product.price), 150, y);
        doc.text(String(product.quantity * product.product.price), 180, y);
        y += 10;
      });
    });

    doc.line(20, y + 2, 190, y + 2);
    doc.setFontSize(14);
    doc.text(`Total: ${orders.reduce((sum, order) => sum + order.total, 0)}`, 180, y + 15);

    doc.setFontSize(10);
    doc.text('Gracias por su compra!', 105, 290, { align: 'center' });

    const pdfArrayBuffer = doc.output('arraybuffer');
    return Buffer.from(pdfArrayBuffer);
  } catch (error) {
    console.error('Error al crear el PDF:', (error as Error).message);
    throw new Error(`Error al crear el PDF: ${(error as Error).message}`);
  }
};
