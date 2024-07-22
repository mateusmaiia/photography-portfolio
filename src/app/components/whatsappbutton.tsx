import Link from 'next/link';

export const WhatsAppButton = () => {
  const phoneNumber = '553198804430'; 
  const message = 'Olá, gostaria de saber mais sobre seus serviços.'; // Mensagem opcional
  const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Link rel="noopener noreferrer" target="_blank" href={url} className='rounded-3xl bg-white text-stone-700 px-3 py-2 text-md hover:bg-opacity-90'>
      Marcar Ensaio 
    </Link>
  );
};
