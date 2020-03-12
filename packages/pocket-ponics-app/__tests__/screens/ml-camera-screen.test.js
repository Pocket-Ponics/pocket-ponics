import React from 'react'
import { shallow } from 'enzyme'

import MLCameraScreen from '../../screens/ml-camera-screen'

describe('ML Camera Screen', () => {
	test('renders correctly', () => {
		const tree = shallow(
			<MLCameraScreen />
		).html()
		expect(tree).toMatchSnapshot()
	})
})