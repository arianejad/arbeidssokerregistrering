// tslint:disable align no-any
import { Frontendlogger } from '../middleware/metrics-middleware';

export function frontendLogger(eventNavn: string) {
    const frontendlogger: Frontendlogger = (window as any).frontendlogger;
    if (frontendlogger) {
        frontendlogger.event(eventNavn, {}, {});
    }
}