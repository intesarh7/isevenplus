"use client";

import { useState } from "react";
import { Undo2, RotateCcw, PlayCircle, Calculator } from "lucide-react";

export default function RefundLossCalculator() {
    const [refundOrders, setRefundOrders] = useState("");
    const [sellingPrice, setSellingPrice] = useState("");
    const [productCost, setProductCost] = useState("");
    const [paymentFee, setPaymentFee] = useState("");
    const [shippingLoss, setShippingLoss] = useState("");
    const [recoverableValue, setRecoverableValue] = useState("");

    const [totalLoss, setTotalLoss] = useState<number | null>(null);

    const calculateLoss = () => {
        const orders = parseFloat(refundOrders);
        const price = parseFloat(sellingPrice);
        const cost = parseFloat(productCost);
        const fee = parseFloat(paymentFee) || 0;
        const shipping = parseFloat(shippingLoss) || 0;
        const recover = parseFloat(recoverableValue) || 0;

        if (isNaN(orders) || isNaN(price) || isNaN(cost)) {
            setTotalLoss(null);
            return;
        }

        const refundAmount = orders * price;
        const productLoss = orders * cost;
        const feeLoss = orders * fee;
        const shippingTotal = orders * shipping;

        const loss = refundAmount + feeLoss + shippingTotal - recover - productLoss;

        setTotalLoss(parseFloat(loss.toFixed(2)));
    };

    const tryExample = () => {
        setRefundOrders("10");
        setSellingPrice("1500");
        setProductCost("800");
        setPaymentFee("50");
        setShippingLoss("100");
        setRecoverableValue("2000");

        const refundAmount = 10 * 1500;
        const productLoss = 10 * 800;
        const feeLoss = 10 * 50;
        const shippingTotal = 10 * 100;

        const loss = refundAmount + feeLoss + shippingTotal - 2000 - productLoss;

        setTotalLoss(loss);
    };

    const resetFields = () => {
        setRefundOrders("");
        setSellingPrice("");
        setProductCost("");
        setPaymentFee("");
        setShippingLoss("");
        setRecoverableValue("");
        setTotalLoss(null);
    };

    return (
        <div className="max-w-4xl mx-auto bg-white shadow-md rounded-xl p-6 md:p-8">

            <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
                <Undo2 className="text-red-600" />
                Refund Loss Calculator
            </h2>

            <div className="grid md:grid-cols-2 gap-6">

                <input type="number" placeholder="Number of Refunded Orders"
                    value={refundOrders}
                    onChange={(e) => setRefundOrders(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input type="number" placeholder="Selling Price (₹)"
                    value={sellingPrice}
                    onChange={(e) => setSellingPrice(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input type="number" placeholder="Product Cost (₹)"
                    value={productCost}
                    onChange={(e) => setProductCost(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input type="number" placeholder="Payment Gateway Fee Per Order (₹)"
                    value={paymentFee}
                    onChange={(e) => setPaymentFee(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input type="number" placeholder="Shipping Loss Per Order (₹)"
                    value={shippingLoss}
                    onChange={(e) => setShippingLoss(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

                <input type="number" placeholder="Recoverable Value (₹)"
                    value={recoverableValue}
                    onChange={(e) => setRecoverableValue(e.target.value)}
                    className="border rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500"
                />

            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-6">

                <button
                    onClick={calculateLoss}
                    className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <Calculator size={18} /> Calculate
                </button>

                <button
                    onClick={tryExample}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <PlayCircle size={18} /> Try Example
                </button>

                <button
                    onClick={resetFields}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-3 rounded-lg flex items-center justify-center gap-2"
                >
                    <RotateCcw size={18} /> Reset
                </button>

            </div>

            {totalLoss !== null && (
                <div className="mt-8 bg-red-50 p-6 rounded-lg text-center">
                    <p className="text-lg font-semibold text-red-700">
                        Estimated Total Refund Loss
                    </p>
                    <p className="text-3xl font-bold text-red-600 mt-2">
                        ₹ {totalLoss}
                    </p>
                </div>
            )}
            <div className="mt-16">

                <h2 className="text-2xl font-bold mb-4">
                    How Refund Loss is Calculated?
                </h2>

                <p className="mb-4 text-gray-700 leading-relaxed">
                    Refund loss includes product cost, payment fees, shipping loss and
                    subtracts any recoverable value from returned items.
                </p>

                <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center font-semibold">
                    Total Loss = Refund Value + Fees + Shipping − Recoverable Amount − Product Cost
                </div>

                <h3 className="text-xl font-semibold mb-3">
                    Why Tracking Refund Loss is Important?
                </h3>

                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                    <li>Identifies refund-related risks</li>
                    <li>Improves pricing strategy</li>
                    <li>Helps reduce operational loss</li>
                    <li>Improves profit margin control</li>
                </ul>

            </div>
        </div>
    );
}