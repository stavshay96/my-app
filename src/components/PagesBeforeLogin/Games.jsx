const Games = [
    {
        gameID: 1,
        name: "פנטזי ליג",
        backgroundURL: "../../images/Players/Pele.png",
        style: {backgroundImage: `url(${
            process.env.PUBLIC_URL + "../../images/Players/Pele.png"
          })`,
          backgroundSize: "contain",
          //backgroundRepeat: "no-repeat",
          /*height: "30vh", */position:'absolute', top:'40%', right:'20%', textAlign: 'center'}
    },
    {
        gameID:2,
        name: "ניחושים",
        backgroundURL:"",
        style: {position:'absolute', top:'40%', right:'41%'}
    },
    {
        gameID:3,
        name:"משחקים נוספים",
        backgroundURL:"../../images/Players/Maradona.png",
        style:{position:'absolute', top:'40%', right:'63%'}
    }

]

export default Games;