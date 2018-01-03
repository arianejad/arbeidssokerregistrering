import * as React from 'react';
import { Provider } from 'react-redux';
import IntlProvider from './Intl-provider';
import getStore from './store';
import RegistrerDeg from './registrer/registrerdeg';
import StartRegistrering from './start/start';
import {
    BrowserRouter as Router,
    Route,
} from 'react-router-dom';
import SkjemaPanel from './skjema/skjema';
import Oppsummering from './oppsummering/oppsummering';
import SblRegistrering from './oppsummering/sbl-registrering';
import './decorator/decorator-mock';
import SjekkOppfolgingsstatusWrapper from './oppfolgingsstatus/sjekk-oppfolgingsstatus-wrapper';

const store = getStore();
export const basename = '/arbeidssokerregistrering';

class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <IntlProvider>
                    <Router basename={basename}>
                        <SjekkOppfolgingsstatusWrapper>
                            <div className="arbsokreg_app">
                                <Route path="/start" component={StartRegistrering}/>
                                <Route path="/registrer" component={RegistrerDeg}/>
                                <Route path="/skjema/:id" component={SkjemaPanel}/>
                                <Route path="/oppsummering" component={Oppsummering}/>
                                <Route path="/sblregistrering" component={SblRegistrering}/>
                            </div>
                        </SjekkOppfolgingsstatusWrapper>
                    </Router>
                </IntlProvider>
            </Provider>
        );
    }
}

export default App;
