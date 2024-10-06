import {React} from "react";
import "./css/Captain.css";

const Captain = (props) => {
    const handleCaptainChoice = (event) => {
        const {value} = event.target;
        const selectedPlayer = props
            .lineup
            .find((player) => player.playerName === value);

        console.log(`${value} value   captain`);
        props.onChangeCaptain(selectedPlayer);
    };

    return (
        <div className="captain-container">
            <select
                className="minimal"
                name="selectedCaptain"
                value={props.captain
                ? props.captain.playerName
                : ''}
                onChange={handleCaptainChoice}>
                <option value="">בחר קפטן</option>

                {props
                    .lineup
                    .map((player) => (
                        <option key={player.id} value={player.playerName}>
                            {player.playerHebName}
                        </option>
                    ))}
            </select>
        </div>
    );
};

export default Captain;