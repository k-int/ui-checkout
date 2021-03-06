import { get } from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import KeyValue from '@folio/stripes-components/lib/KeyValue';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Headline from '@folio/stripes-components/lib/Headline';
import ProxyManager from '@folio/stripes-smart-components/lib/ProxyManager';
import UserDetail from '../UserDetail';
import css from './ViewPatron.css';

class ViewPatron extends React.Component {
  static contextTypes = {
    translate: PropTypes.func,
  };

  static propTypes = {
    stripes: PropTypes.object.isRequired,
    patron: PropTypes.object.isRequired,
    proxy: PropTypes.object.isRequired,
    onSelectPatron: PropTypes.func.isRequired,
    onClearPatron: PropTypes.func.isRequired,
    resources: PropTypes.shape({
      openLoansCount: PropTypes.shape({
        records: PropTypes.arrayOf(PropTypes.object),
      }),
    }).isRequired,
  };

  static manifest = Object.freeze({
    openLoansCount: {
      type: 'okapi',
      path: 'circulation/loans?query=(userId=!{patron.id} and status.name<>Closed)&limit=1',
    },
  });

  constructor(props) {
    super(props);

    this.connectedProxyDetail = props.stripes.connect(UserDetail, { dataKey: 'proxy' });
    this.connectedPatronDetail = props.stripes.connect(UserDetail, { dataKey: 'patron' });
    this.connectedProxyManager = props.stripes.connect(ProxyManager);
  }

  render() {
    const { translate } = this.context;
    const { patron, proxy, resources } = this.props;
    const openLoansCount = get(resources.openLoansCount, ['records', '0', 'totalRecords'], 0);
    const patronDetail = (
      <div>
        <br />
        <this.connectedPatronDetail id="patron-detail" label={<Headline size="medium">{translate('borrower')}</Headline>} user={patron} {...this.props} />
        <div className={css.section}>
          <Row>
            <Col xs={4}>
              <KeyValue label={translate('openLoans')} value={openLoansCount} />
            </Col>
          </Row>
        </div>
      </div>
    );

    const proxyDetail = (
      <div>
        <br />
        <this.connectedProxyDetail id="proxy-detail" label={translate('borrowerProxy')} user={proxy} {...this.props} />
        <div className={css.section}>
          <Row>
            <Col xs={4}>
              <KeyValue label={translate('proxyExpiration')} value="-" />
            </Col>
          </Row>
        </div>
      </div>
    );

    return (
      <div>
        {patronDetail}
        {proxy.id && proxy.id !== patron.id && proxyDetail}
        <this.connectedProxyManager
          patron={patron}
          proxy={proxy}
          onSelectPatron={this.props.onSelectPatron}
          onClose={this.props.onClearPatron}
        />
      </div>
    );
  }
}

export default ViewPatron;
