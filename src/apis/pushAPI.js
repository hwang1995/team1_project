import axios from 'axios';

/**
 * * 목적 : MQTT 프로토콜에 메시지를 보내기 위한 API
 * @param {PushMessageVO} pushMessage 
 * * !String topic
 * * !String priority
 * * !String message
 * * !LocalDateTime createdAt (new Date().toJSON() 으로 보내면 됨)
 * @returns {Boolean} result
 * @throws
 * * HTTP Status 500 Internal Server Error
 * @author SUNG WOOK HWANG
 */
export const sendMqttMessage = async (pushMessage) => {
    const result = await axios.post('/mqtt', pushMessage);
    return result.data.data;
}

/**
 * * 목적 : 보내진 Push 메시지를 보여주기 위한 API
 * @param {string} topic (/hospitalCode/memberAuthority 형식으로 구독)
 * @returns {List<PushMessageVO>} result
 * * !String topic
 * * !String priority
 * * !String message
 * * !LocalDateTime createdAt (const [year, date, day, time] 순으로 가져오면 됨)
 * @throws
 * * HTTP Status 400 - Bad Request
 * * * status - "no_topics"
 * * * message - "토픽이 존재하지 않거나 공백입니다."
 * * HTTP Status 404 - Not Found
 * * * status - "no_message"
 * * * message - "수신 받은 메시지가 존재하지 않습니다."
 */
export const getNotificationByTopic = async (topic) => {
    const result = await axios.get('/mqtt/notification', {
        params: {
            topic
        }
    });

    const data = result.data.data;
    return data;
}
