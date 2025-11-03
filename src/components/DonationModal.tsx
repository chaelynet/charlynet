import { Check, AlertCircle, Lock, Mail } from 'lucide-react';

interface DonationModalProps {
  showDonation: boolean;
  setShowDonation: (show: boolean) => void;
  userAddress: string;
  connectWallet: () => void;
}

export default function DonationModal({ showDonation, setShowDonation, userAddress, connectWallet }: DonationModalProps) {
  const TIA_CONTRACT = "0x8c7ec041521f33f21416e75228afdf05016db6a1";
  const foundersNeeded = 5;
  const foundersCommitted = 0;

  if (!showDonation) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">
                Convertirme en Fundador
              </h2>
              <p className="text-gray-300">
                Solo 5 plazas disponibles para Fase 0
              </p>
            </div>
            <button 
              onClick={() => setShowDonation(false)}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          {!userAddress ? (
            <div className="text-center py-8">
              <p className="text-gray-300 mb-6">
                Primero conecta tu wallet para continuar
              </p>
              <button 
                onClick={connectWallet}
                className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 text-white px-8 py-4 rounded-full font-bold transition flex items-center gap-2 mx-auto"
              >
                <Lock className="w-5 h-5" />
                Conectar MetaMask
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Opción Fundador */}
              <div className="bg-purple-900/30 rounded-xl p-6 border-2 border-purple-400">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">🌳 Fundador CharlyNet</h3>
                    <p className="text-sm text-gray-400">Una de las 5 plazas fundacionales</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-purple-400">$10,000</div>
                    <div className="text-xs text-gray-400">pago único</div>
                  </div>
                </div>
                
                <div className="bg-purple-900/40 rounded-lg p-4 mb-4">
                  <h4 className="text-white font-semibold mb-3">Incluye:</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm text-gray-300">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>10M TIA (locked 5 años)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>1 niño asignado 20 años</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Placa física</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>NFT exclusivo</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Voto triple</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400" />
                      <span>Graduación 2045</span>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4 mb-4">
                  <p className="text-yellow-200 text-sm flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                    <span>
                      <strong>Proceso Fase 0:</strong> Envía email a fundadores@charlynet.org 
                      con tu wallet address {userAddress.slice(0,10)}... 
                      Te contactaremos en 24h para procesar pago (crypto o transferencia bancaria).
                    </span>
                  </p>
                </div>

                <a 
                  href={`mailto:fundadores@charlynet.org?subject=Solicitud Fundador CharlyNet&body=Wallet: ${userAddress}%0D%0A%0D%0AQuiero ser uno de los 5 fundadores de CharlyNet. Confirmo compromiso de $10,000 para Fase 0.`}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white py-4 rounded-lg font-bold text-center block transition"
                >
                  Solicitar Plaza vía Email
                </a>
                <p className="text-xs text-center text-gray-400 mt-2">
                  Quedan {foundersNeeded - foundersCommitted} de 5 plazas
                </p>
              </div>

              {/* Donación Custom */}
              <div className="bg-white/5 rounded-xl p-6 border border-white/20">
                <h3 className="text-lg font-bold text-white mb-3">¿Quieres aportar otro monto?</h3>
                <p className="text-sm text-gray-400 mb-4">
                  Aceptamos cualquier aporte. Recibirás 1,000 TIA por cada $1 USD cuando Fase 1 inicie.
                </p>
                <a 
                  href={`mailto:fundadores@charlynet.org?subject=Contribución CharlyNet&body=Wallet: ${userAddress}%0D%0A%0D%0AQuiero contribuir a CharlyNet Fase 0.`}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-bold text-center block transition flex items-center gap-2 justify-center"
                >
                  <Mail className="w-4 h-4" />
                  Contactar por Contribución
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
