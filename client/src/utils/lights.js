import store from "../store";
import $socket from "./socketServer";

function getControlValue(level, row) {
    return store.state.controlValues[level][row];
}

function evalLightLevel(level, light) {
    const direction = store.state.direction;
    const row = light.row % 4 === 0 ? 4 : light.row % 4;

    if (direction.includes(light.type)) {
        switch (true) {
            case level > 1000:
                return getControlValue(1000, row);
            case level > 900:
                return getControlValue(900, row);
            case level > 800:
                return getControlValue(800, row);
            case level > 700:
                return getControlValue(700, row);
            case level > 600:
                return getControlValue(600, row);
            case level > 500:
                return getControlValue(500, row);
            case level > 400:
                return getControlValue(400, row);
            case level > 300:
                return getControlValue(300, row);
            case level > 200:
                return getControlValue(200, row);
            case level > 100:
                return getControlValue(100, row);
            case level > 0:
                return getControlValue(0, row);
        }
    }
    return 0; // if direction disabled, opacity 0
}

export function updateLightsValues(lightLevel) {
    const lights = [...store.state.lights];

    return lights.map(light =>
        light.auto && $socket.connected
            ? evalLightLevel(lightLevel, light)
            : light.value
    );
}

export function mapLightsLevels(values, newMax = 255, oldMax = 100) {
    return values.map(value => {
        let val = value;

        if (val < 0) {
            val = 0;
        } else if (val > 100) {
            val = 100;
        }

        return Math.ceil((val * newMax) / oldMax);
    });
}
