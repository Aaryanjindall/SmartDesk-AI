import { FileText, Sparkles, Zap, Download } from 'lucide-react'
import React, { useState, useRef } from 'react'
import { QRCodeCanvas } from "qrcode.react";

const Qrcode = () => {

    const qrRef = useRef();

    const [input, setInput] = useState("")
    const [size, setSize] = useState(300)
    const [qrValue, setQrValue] = useState("");

    const [loading, setLoading] = useState(false)

    const downloadQR = () => {
        const canvas = qrRef.current.querySelector("canvas");
        const url = canvas.toDataURL("image/png");
        const link = document.createElement("a");
        link.href = url;
        link.download = "qrcode.png";
        link.click();
    }

    const generateQR = (e) => {
        e.preventDefault();
        setLoading(true);
        setTimeout(() => {
            setQrValue(input);
            setLoading(false);
        }, 300);
    }

    return (
        <div className="h-full overflow-y-auto p-4 sm:p-6 lg:p-8">
            <div className='max-w-7xl mx-auto'>

                {/* Header */}
                <div className='mb-8'>
                    <div className='flex items-center gap-3 mb-2'>
                        <div className='w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/30'>
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-purple-400">QR Code Generator</h1>
                            <p className='text-sm text-gray-400'>Generate Neon Styled QR Code</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Form */}
                    <form
                        onSubmit={generateQR}
                        className="glass rounded-2xl p-6 border border-purple-500/20 hover:border-purple-500/40 transition-all"
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <Sparkles className="w-6 h-6 text-purple-400" />
                            <h2 className="text-xl font-semibold text-white">Generate QR</h2>
                        </div>

                        <div className='mb-6'>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Enter Text or URL
                            </label>
                            <input
                                type='text'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="https://example.com"
                                className="w-full p-3 bg-[#0f0f15] border border-purple-500/20 rounded-lg text-white focus:outline-none focus:border-purple-500/50 focus:ring-2 focus:ring-purple-500/20 transition-all"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={!input}
                            className="w-full flex justify-center items-center gap-2
                            bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600
                            text-white px-6 py-3 rounded-lg font-medium
                            shadow-lg shadow-purple-500/30
                            transform transition-all hover:scale-[1.02] active:scale-[0.98]
                            disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <>
                                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                                    <span>Generating...</span>
                                </>
                            ) : (
                                <>
                                    <Zap className="w-5 h-5" />
                                    <span>Generate QR</span>
                                </>
                            )}
                        </button>
                    </form>

                    {/* QR Display Section */}
                    <div className="glass rounded-2xl p-6 border border-pink-500/20 flex flex-col items-center justify-center min-h-[500px]">

                        {qrValue ? (
                            <>
                                <div ref={qrRef} className="p-6 bg-white rounded-xl shadow-lg">
                                    <QRCodeCanvas
                                        value={qrValue}
                                        size={size}
                                        bgColor="#ffffff"
                                        fgColor="#000000"
                                        level="H"
                                    />
                                </div>

                                <button
                                    onClick={downloadQR}
                                    className="mt-6 flex items-center gap-2
                                    bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600
                                    text-white px-6 py-3 rounded-lg font-medium
                                    shadow-lg shadow-pink-500/30
                                    transition-all hover:scale-[1.02]"
                                >
                                    <Download className="w-5 h-5" />
                                    Download QR
                                </button>
                            </>
                        ) : (
                            <p className="text-gray-400">Enter text to generate QR Code</p>
                        )}

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Qrcode
