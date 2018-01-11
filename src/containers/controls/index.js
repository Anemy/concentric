import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
  historyBack,
  historyForward,
  randomizeVizual
} from '../../modules/canvas';

import Controls from '../../components/controls';

import { createColorString, getContrastingBinaryColor } from '../../utils';

const mapStateToProps = state => ({
  randomizeButtonBackgroundColor: createColorString(state.canvas.present.colors[state.canvas.present.colors.length - 1]),
  randomizeButtonLabelColor: getContrastingBinaryColor(state.canvas.present.colors[state.canvas.present.colors.length - 1])
});

const mapDispatchToProps = dispatch => bindActionCreators({
  historyBack: () => historyBack(),
  historyForward: () => historyForward(),
  randomizeVizual: () => randomizeVizual()
}, dispatch);

export default connect(
  mapStateToProps, 
  mapDispatchToProps
)(Controls);
