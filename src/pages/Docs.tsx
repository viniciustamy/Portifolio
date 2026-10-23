import { useDocumentTitle } from '../hooks/useDocumentTitle';

export default function Docs() {
  useDocumentTitle('Documentos');
  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h1 className="text-3xl font-bold mb-8 text-[#241510]">Documentos</h1>
      <div className="bg-[#EBE7DD] rounded-[2rem] p-12 text-center border border-[#E2DCD4]">
        <p className="text-lg text-[#6F625B] mb-8">
          A seção de documentos está atualmente sendo editada pelo código.
        </p>
      </div>
    </div>
  );
}
