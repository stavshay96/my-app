import EnglandFlag from '../../../images/Flags/England.png';
import ChampionsLeagueFlag from '../../../images/Flags/ChampionsLeague.png';
import IsraelFlag from '../../../images/Flags/Israel.png';
import ItalyFlag from '../../../images/Flags/Italy.png';
import SuperLeagueFlag from '../../../images/Flags/SuperLeague.png';
import CustomLeagueFlag from '../../../images/Flags/CustomLeague.png';

const PredictionsLeagues = [
    
    { leagueID: 1,
        name: "פרמייר ליג",
        pathName:"PremierLeague",
        flag: EnglandFlag},
    {leagueID:2,
        name:"ליגת העל",
        pathName:"LigatHa'al",
        flag: IsraelFlag},
    {leagueID: 3,
        name:"ליגה לאומית",
        pathName:"LigaLeumit",
        flag: IsraelFlag},
    {leagueID: 4,
        name:"ליגה איטלקית",
        pathName:"SerieA",
        flag: ItalyFlag},
    {leagueID: 5,
        name:"ליגת האלופות",
        pathName:"ChampionsLeague",
        flag: ChampionsLeagueFlag},
    {leagueID: 6,
        name:"סופרליג",
        pathName:"SuperLeague",
        flag: SuperLeagueFlag},
    {leagueID: 7,
        name:"ניחוש יחיד",
        pathName:"SinglePrediction",
        flag: CustomLeagueFlag}
]

export default PredictionsLeagues; 