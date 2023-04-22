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
          textIndent: '10%',
          backgroundRepeat: "no-repeat", position:'absolute', top:'40%', right:'20%',
          fontFamily: 'sans-serif'  ,
          fontSize: '2vw',
          padding: '15% 5.5%', paddingTop:'2vw', whiteSpace:'nowrap',
          textShadow: '0vw 0.1vw 0.1vw #2f6627'}
    },
    {
        gameID:2,
        name: "ניחושים",
        style: {backgroundImage: `url(${Zidane})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: '-3.5vw 2.5vw', position:'absolute', top:'40%', right:'41%',
        fontFamily: 'sans-serif'  ,
        fontSize: '2vw',
        padding: '15% 6%', paddingTop:'2vw',
        textShadow: '0vw 0.1vw 0.1vw #2f6627'}
    },
    {
        gameID:3,
        name:"משחקים נוספים",
        style:{backgroundImage: `url(${Maradona})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: '-2.5vw 2.7vw', position:'absolute', top:'40%', right:'62%',
        fontFamily: 'sans-serif'  ,
        fontSize: '2vw',
        padding: '15% 2.5%', paddingTop:'2vw',
        textShadow: '0vw 0.1vw 0.1vw #2f6627',
        }
    }

]

export default Games;