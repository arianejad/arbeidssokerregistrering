import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect, Dispatch } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import KnappBase from 'nav-frontend-knapper';
import { DITTNAV_URL } from '../../ducks/api';
import { AppState } from '../../reducer';
import { reaktiverBruker, State as ReaktiverBrukerState } from '../../ducks/reaktiverbruker';
import Loader, { loaderTittelElement } from '../../komponenter/loader/loader';
import ReaktiveringFeilhandtering from './feilhandtering/reaktivering-feilhandtering';
import Innholdslaster from '../../komponenter/innholdslaster/innholdslaster';
import { MatchProps } from '../../utils/utils';
import { DUERNAREGISTRERT_PATH, START_PATH } from '../../utils/konstanter';
import {
    Data as RegistreringstatusData, RegistreringType,
    selectRegistreringstatus
} from '../../ducks/registreringstatus';

import handinfoSvg from './handinfo.svg';
import './krever-reaktivering.less';

interface StateProps {
    reaktiverBrukerData: ReaktiverBrukerState;
    registreringstatusData: RegistreringstatusData;
}

interface DispatchProps {
    onReaktiverBruker: () => Promise<void | {}>;
}
type Props = RouteComponentProps<MatchProps> & StateProps & DispatchProps;

class KreverReaktivering extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.reaktiverBrukerOnClick = this.reaktiverBrukerOnClick.bind(this);
    }

    componentWillMount() {
        if (this.props.registreringstatusData.registreringType !== RegistreringType.REAKTIVERING) {
            this.props.history.push(START_PATH);
        }
    }

    reaktiverBrukerOnClick() {
        const {onReaktiverBruker, history} = this.props;
        onReaktiverBruker()
            .then((res) => {
                if (!!res) {
                    history.push(DUERNAREGISTRERT_PATH);
                }
            });
    }

    render() {
        const {reaktiverBrukerData} = this.props;

        return (
            <Innholdslaster
                feilmeldingKomponent={<ReaktiveringFeilhandtering/>}
                avhengigheter={[reaktiverBrukerData]}
                loaderKomponent={<Loader tittelElement={loaderTittelElement}/>}
            >
                <section className="krever-reaktivering">
                    <Innholdstittel className="krever-reaktivering__tittel">
                        <FormattedMessage id="krever-reaktivering-tittel"/>
                    </Innholdstittel>
                    <div className="krever-reaktivering__infopanel">
                        <div className="krever-reaktivering__handinfo-ikon">
                            <img src={handinfoSvg} alt="Hånd med info skilt" className="illustrasjon"/>
                        </div>
                        <div className="krever-reaktivering__tekster">
                            <Normaltekst>
                                <FormattedMessage id="krever-reaktivering-boks-tekst"/>
                            </Normaltekst>
                        </div>
                    </div>
                    <div className="krever-reaktivering__aksjonspanel">
                        <Normaltekst>
                            <FormattedMessage id="krever-reaktivering-undertittel"/>
                        </Normaltekst>
                        <div className={'knapper-vertikalt'}>
                            <KnappBase
                                type="hoved"
                                onClick={this.reaktiverBrukerOnClick}
                            >
                                <FormattedMessage id="ja"/>
                            </KnappBase>
                            <a href={DITTNAV_URL} className="lenke-avbryt typo-element">
                                <FormattedMessage id="avbryt-lenke"/>
                            </a>
                        </div>
                    </div>
                </section>
            </Innholdslaster>
        );
    }
}

const mapStateToProps = (state) => ({
    reaktiverBrukerData: state.reaktiverBruker,
    registreringstatusData: selectRegistreringstatus(state).data,
});

const mapDispatchToProps = (dispatch: Dispatch<AppState>): DispatchProps => ({
    onReaktiverBruker: () => dispatch(reaktiverBruker()),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(
    KreverReaktivering
));
