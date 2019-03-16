import react, { Component } from 'react';
import { Icon, Badge } from 'antd'
class Navbar extends Component {
    render() {
        return (
            <div style={{ "display": "flex", "color":"#fff", "justifyContent": "space-between" }}>
                <b><Icon style={{"fontSize": "32px" }} type="medium"/></b>
                <ul style={{ "listStyle": "none", "display": "flex" }}>
                    <li><Badge count={3}><Icon  style={{"fontSize": "16px", "marginLeft":"20px" }} type="bell" /></Badge></li>
                    <li><Icon  style={{"fontSize": "16px", "marginLeft":"20px" }} type="setting" /></li>
                </ul>
            </div>
        )
    }
}

export default Navbar;