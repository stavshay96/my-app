import Pele from "../../images/Players/Pele.png";
import Maradona from "../../images/Players/Maradona.png";
import Zidane from "../../images/Players/Zidane.png";

const Games = [
    {
        gameID: 1,
        name: "פנטזי ליג",
        backgroundURL: "../../images/Players/Pele.png",
        style: {backgroundImage: `url(${Pele})`,
          backgroundSize: "cover",
          backgroundPosition: '-4vw 2vw',
          textIndent: '-3.5vw',
          backgroundRepeat: "no-repeat", position:'absolute', top:'40%', right:'20%'}
    },
    {
        gameID:2,
        name: "ניחושים",
        style: {backgroundImage: `url(${Zidane})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: '-3.5vw 2.5vw', position:'absolute', top:'40%', right:'41%', textIndent: '-3vw'}
    },
    {
        gameID:3,
        name:"משחקים נוספים",
        style:{backgroundImage: `url(${Maradona})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: '-2.5vw 2.7vw', position:'absolute', top:'40%', right:'63%', textIndent: '-6vw',}
    }

]

export default Games;