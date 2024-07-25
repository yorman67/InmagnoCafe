"use client"
import { sendEmail } from "@/actions/send-bill-action";
import { BillOrderSchema } from "@/src/schema";
import { OrderWithProducts } from "@/src/types";
import { toast } from "react-toastify";

type BillOrderProps = {
    setSendBill: React.Dispatch<React.SetStateAction<boolean>>
    orders: OrderWithProducts[]
}
export default function BillOrder({ setSendBill,orders }: BillOrderProps) {

    const handleSendEmail = async (formData: FormData) => {
        const data  = {
            idBill: formData.get("billId"),
            fecha: formData.get("date"),
            nameBusiness: formData.get("nameBussiness"),
            nit: formData.get("nit"),
            address: formData.get("address"),
            nameClient: formData.get("nameClient"),
            emailClient: formData.get("emailClient"),
            idClient: formData.get("idClient"),
            phoneClient: formData.get("phoneClient"),
        };

        const result = BillOrderSchema.safeParse(data);

        if (!result.success) {
            result.error.issues.forEach(
                issue => toast.error(issue.message)
            )
            return
        }
        
        const response = await sendEmail({data:result.data,orders});

        if(!response.success){
            toast.error(response.message)
        }

        toast.success('Factura enviada')
        setSendBill(false)
        
    }


    return (
        <div className="max-w-4xl mx-auto my-12 p-8 bg-white shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-700">Enviar Factura</h2>
            <form
                className="space-y-8"
                onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.target as HTMLFormElement);
                    handleSendEmail(formData);
                }}
            >
                <div className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label
                                htmlFor="billId"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Número de Factura
                            </label>
                            <input
                                id="billId"
                                name="billId"
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                defaultValue={"123456"}
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="date"
                                className="block text-sm font-medium text-gray-700 mb-1"
                            >
                                Fecha
                            </label>
                            <input
                                id="date"
                                name="date"
                                type="text"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                defaultValue={new Date().toLocaleDateString()}
                            />
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Datos de la Empresa</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="nameBussiness"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Nombre o Razón Social
                                </label>
                                <input
                                    id="nameBussiness"
                                    name="nameBussiness"
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    defaultValue={"Inmagno"}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="nit"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    NIT
                                </label>
                                <input
                                    id="nit"
                                    name="nit"
                                    type="text"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    defaultValue={"123456-nit"}
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="address"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Dirección
                                </label>
                                <input
                                    id="address"
                                    name="address"
                                    type="text"
                                    placeholder="Dirección de la empresa"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                    defaultValue={"Calle 1 # 2-3"}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                        <h3 className="text-xl font-bold text-gray-700 mb-4">Datos del Cliente</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label
                                    htmlFor="nameClient"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Nombre del Cliente
                                </label>
                                <input
                                    id="nameClient"
                                    name="nameClient"
                                    type="text"
                                    placeholder="Nombre del cliente"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="emailClient"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Email del Cliente
                                </label>
                                <input
                                    id="emailClient"
                                    name="emailClient"
                                    type="email"
                                    placeholder="Email del cliente"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="idClient"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    ID del Cliente
                                </label>
                                <input
                                    id="idClient"
                                    name="idClient"
                                    type="text"
                                    placeholder="ID del cliente"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label
                                    htmlFor="phoneClient"
                                    className="block text-sm font-medium text-gray-700 mb-1"
                                >
                                    Teléfono del Cliente
                                </label>
                                <input
                                    id="phoneClient"
                                    name="phoneClient"
                                    type="text"
                                    placeholder="Teléfono del cliente"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <input
                    type="submit"
                    className="w-full bg-amber-500 text-white font-bold py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 hover:bg-amber-600 transition-all duration-300"
                    value="Enviar Factura"
                />
            </form>
        </div>
    );
}
