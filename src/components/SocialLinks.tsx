import { Instagram, Linkedin, Mail, MessageCircle } from 'lucide-react';

// Contatos usados na coluna da Home e no rodapé
const socials = [
  { href: 'https://www.linkedin.com/in/viniciustamy', label: 'LinkedIn', icon: Linkedin },
  { href: 'https://www.instagram.com/viniciustamy', label: 'Instagram', icon: Instagram },
  { href: 'https://wa.me/5524974020554', label: 'WhatsApp', icon: MessageCircle },
  { href: 'mailto:vinitamy13@gmail.com', label: 'E-mail', icon: Mail },
];

export function SocialLinks() {
  return (
    <div className="flex items-center gap-2">
      {socials.map(({ href, label, icon: Icon }) => (
        <a
          key={label}
          href={href}
          target={href.startsWith('mailto:') ? undefined : '_blank'}
          rel="noopener noreferrer"
          title={label}
          aria-label={label}
          className="w-10 h-10 rounded-full border border-[#241510]/15 text-[#241510] flex items-center justify-center hover:border-[#9E4322] hover:text-[#9E4322] transition-colors"
        >
          <Icon size={17} />
        </a>
      ))}
    </div>
  );
}
