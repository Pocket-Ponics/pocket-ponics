import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

Enzyme.configure({ adapter: new Adapter() })

function suppressDomErrors() {
	const suppressedErrors = /(React does not recognize the.*prop on a DOM element|Unknown event handler property|Invalid DOM property .* Did you mean .*|is using uppercase HTML|Received .* for a non-boolean attribute .*|The tag.*is unrecognized in this browser|PascalCase)/
	// eslint-disable-next-line no-console
	const realConsoleError = console.error
	// eslint-disable-next-line no-console
	console.error = message => {
		if (message.match(suppressedErrors)) {
			return
		}
		realConsoleError(message)
	}
}
suppressDomErrors()