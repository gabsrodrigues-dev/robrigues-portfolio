import { useEffect } from 'react';
import { useRouter } from 'next/router';

const redirections = [
  { name: 'Vídeo da Thaís', link: 'https://youtu.be/SSd0EdlbWqc', url: 'thay031024' },
  { name: 'facebook', link: 'https://www.facebook.com', url: 'facebook' },
  { name: 'github', link: 'https://www.github.com', url: 'github' },
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
