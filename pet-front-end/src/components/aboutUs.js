import React from 'react';
import { Typography, Divider} from 'antd';
import { Card, Col, Row } from 'antd';
import ER from './../assets/ERDiagram.png';
import Schema from './../assets/SchemaDiagram.png';


const {Title, Paragraph} = Typography;
const {Meta} = Card;

function AboutUs(props) {
    return (
        <div style={{padding: 30, marginRight: 100, marginLeft: 100}}>
            <Title>
                Pet Groomers Database
            </Title>
            <Divider />
            <Title level={2}>
                Business Overview
            </Title>
            <Paragraph>
                This front-end is meant to support the Pet Groomers database. Pet Groomers is a medium-sized, 
                family-owned pet grooming salon that sees around 400 appointments per day. This database's scope
                includes tracking appointments, shifts, store inventory, client info, and employee info. Anything not 
                listed is deemed out of scope and includes things such as payment transaction records and multiple 
                pet salon branches.
            </Paragraph>
            <Divider />
            <Title level={2}>
                Data Model
            </Title>
            <Row >
                <Col span={16} style={{padding: 10}}>
                <Card bordered={false} title='ER Diagram'  cover={<img alt="ER Diagram" src={ER}/>}/>
                </Col>
                <Col span={8} style={{padding: 10}}>
                <Card style={{height: 50}} bordered={false} title='Schema Diagram'  cover={<img  alt="Schema Diagram" src={Schema}/>}/>
                </Col>
            </Row>
            <Row>
            </Row>

            <Divider />
            <Title level={2}>
                Database Team
            </Title>
            <Row style={{'marginBottom': 15, padding: 15}}>
                <Col span={6} style={{padding: 10}}>
                    <Card cover={<img alt='al madireddy' src='https://scontent-dfw5-1.xx.fbcdn.net/v/t1.0-9/34287166_254003195340893_8301510362499383296_o.jpg?_nc_cat=103&_nc_sid=85a577&_nc_ohc=3oEUA_Pt4x8AX-j9gto&_nc_ht=scontent-dfw5-1.xx&oh=cbd0bfa9c28c7525cc25d14d4ebf4adc&oe=5ED0FCA9'/>}>
                        <Meta title='Aahlad Madireddy'/>
                    </Card>
                </Col>
                <Col span={6} style={{padding: 10}}>
                    <Card cover={<img alt='pallavi nanu' src='https://scontent-dfw5-1.xx.fbcdn.net/v/t1.0-1/87169588_1516525735188147_6088467453224943616_n.jpg?_nc_cat=103&_nc_sid=dbb9e7&_nc_ohc=WcP7M4ggbdIAX-cDVdC&_nc_ht=scontent-dfw5-1.xx&oh=6c9968c75bf4e585cbceacd47a52d07a&oe=5ECEAFAF' />}>
                        <Meta title='Pallavi Nanu'/>
                    </Card>
                </Col>
                <Col span={6} style={{padding: 10}}>
                    <Card cover={<img alt='arjun khurana' src='https://cdn.discordapp.com/attachments/703683427249160237/705487886903934986/IMG_5900.jpg'/>}>
                        <Meta title='Arjun Khurana'/>
                    </Card>
                </Col>
                <Col span={6} style={{padding: 10}}>
                    <Card cover={<img alt='mustafa sadriwala' src='https://scontent-dfw5-2.xx.fbcdn.net/v/t1.0-9/62550789_1352754788207957_9176129647161638912_n.jpg?_nc_cat=100&_nc_sid=85a577&_nc_ohc=nCkw1mYcTGAAX8Us_JZ&_nc_ht=scontent-dfw5-2.xx&oh=8d78c2e95df6299a79ac57e12d5928c0&oe=5ED17262'/>}>
                        <Meta title='Mustafa Sadriwala'/>
                    </Card>
                </Col>
            </Row>

        </div>
    )
}

export default AboutUs;