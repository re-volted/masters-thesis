import store from "../store";
import $socket from "./socketServer";

function evalLightLevel(level, light) {
    const direction = store.state.direction;

    if (direction.includes(light.type)) {
        if (level < 170) return 1 * 100; // all lights to max when it's dark in the classroom
        if (level < 500) return (light.row / 4) * 100; // all lights medium when its quite well lighted
        return (light.row / 8) * 100;
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
