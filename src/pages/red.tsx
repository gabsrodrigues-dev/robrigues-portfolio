import { useEffect } from 'react';
import { useRouter } from 'next/router';

const redirections = [
  { name: 'Vídeo da Thaís', link: 'https://youtu.be/1FAi4QYdzoY', url: 'thay031024' },
  { name: 'Insta do gabs', link: 'https://www.instagram.com/gabriel_torresr', url: 'gabinsta1024' },
];

const Red = () => {
  const router = useRouter();
  const { l } = router.query;

  useEffect(() => {
    if (l) {
      const target = redirections.find((item) => item.url === l);
      if (target) {
        console.log(`Redirecionando para ${target.name}`)
        window.location.href = target.link;
      }
    } else {
      window.location.href = "/"
    }
  }, [l]);

  return <div className='flex w-screen h-screen justify-center items-center'>Redirecionando :D</div>;
};

export default Red;
