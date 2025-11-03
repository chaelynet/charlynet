interface FAQModalProps {
  showFAQ: boolean;
  setShowFAQ: (show: boolean) => void;
}

export default function FAQModal({ showFAQ, setShowFAQ }: FAQModalProps) {
  if (!showFAQ) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-slate-900 to-blue-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="p-8">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-3xl font-bold text-white">FAQ Honesto</h2>
            <button 
              onClick={() => setShowFAQ(false)}
              className="text-gray-400 hover:text-white text-2xl"
            >
              ×
            </button>
          </div>

          <div className="space-y-6">
            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">¿Por qué operadores anónimos?</h3>
              <p className="text-gray-300">
                Por seguridad. Operar en Haití implica riesgos reales. Los coordinadores locales tampoco se nombran públicamente. 
                La transparencia está en los números, no en los rostros. Todo trazable en blockchain + auditorías IA públicas.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">¿Por qué confiar sin historial previo?</h3>
              <p className="text-gray-300 mb-3">
                <strong className="text-white">No deberías confiar ciegamente.</strong> Por eso:
              </p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Cada transacción trazable en blockchain desde día 1</li>
                <li>• 4 IAs auditando (juramentos públicos + reportes mensuales)</li>
                <li>• Derecho a reembolso si Fase 0 no se completa en 90 días</li>
                <li>• Documentación pública de cada avance y error</li>
                <li>• Fundación 501(c)(3) verificable (en proceso Fase 0)</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">¿Qué pasa si no se completa Fase 0?</h3>
              <p className="text-gray-300">
                Si en 90 días no conseguimos los 5 fundadores ($50k), <strong className="text-white">reembolsamos todo</strong>. 
                Sin excusas. Preferimos no empezar que empezar mal.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">¿Cuánto cuesta sostener 1 niño 20 años?</h3>
              <p className="text-gray-300 mb-2">
                Desglose realista:
              </p>
              <ul className="text-gray-300 space-y-1 text-sm">
                <li>• Años 1-12 (primaria + secundaria): $3,600/año × 12 = $43,200</li>
                <li>• Años 13-16 (universidad): $8,000/año × 4 = $32,000</li>
                <li>• Años 17-20 (especialización IA): $6,000/año × 4 = $24,000</li>
                <li className="font-bold text-white pt-2">TOTAL: ~$100,000 por niño completo</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">¿Qué hace el Token TIA realmente?</h3>
              <p className="text-gray-300 mb-3">
                TIA es un token de <strong className="text-white">gobernanza + prueba de impacto</strong>, no inversión financiera:
              </p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• <strong className="text-white">Voto proporcional:</strong> 1 TIA = 1 voto en decisiones comunitarias</li>
                <li>• <strong className="text-white">Proof of Impact:</strong> Solo se genera donando a proyectos CharlyNet</li>
                <li>• <strong className="text-white">No promesa de precio:</strong> No es inversión. Su valor es utilidad de gobernanza</li>
                <li>• <strong className="text-white">Trazabilidad:</strong> Cada TIA mapea a dólar donado específico</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">¿Y si falla en el camino?</h3>
              <p className="text-gray-300 mb-2">
                Tenemos plan de mitigación por fases:
              </p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• <strong>Si falla en Año 1-2:</strong> Fondos remanentes se distribuyen equitativamente a padrinos</li>
                <li>• <strong>Si falla en Año 5-10:</strong> Trust asegura que los niños ya inscritos terminen, aunque no se acepten nuevos</li>
                <li>• <strong>Documentación brutal:</strong> Publicamos qué salió mal, por qué, qué aprendimos</li>
                <li>• <strong>Veto IA:</strong> Si 2+ Guardianes detectan problema moral grave, pueden suspender operaciones</li>
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">¿Por qué Haití y no [otro país]?</h3>
              <p className="text-gray-300">
                Porque <strong className="text-white">ya estuvimos ahí</strong> en 2011-2014. Conocemos el terreno, la idiosincrasia, 
                los puntos de fuga de corrupción. Sabemos cómo operar desde RD/Miami con coordinación local. No empezamos desde teoría. 
                Empezamos desde experiencia dolorosa anterior.
              </p>
            </div>

            <div className="bg-white/5 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-3">¿Cuándo veré resultados reales?</h3>
              <p className="text-gray-300">
                <strong className="text-white">Fase 0 (Meses 1-3):</strong> Estructura legal, coordinador, validación costos.<br />
                <strong className="text-white">Fase 1 (Año 1):</strong> Primeros 100 niños en escuelas. Reportes mensuales públicos.<br />
                <strong className="text-white">Año 5:</strong> 1,000 niños activos, modelo validado, primeros graduados secundaria.<br />
                <strong className="text-white">Año 20:</strong> Primeros graduados universitarios + especialización IA.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
