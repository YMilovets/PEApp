import React, { Component } from 'react'
import { Link } from "react-router-dom"

export default class exercise extends Component {
    constructor(props) {
        super(props);
        this.threads = [];          //Массив звуковых потоков
        this.state = {
            timeID: null,           //Идентификатор таймера 
            step: 0,                //Шаг выполнения отсчета таймера 
            countDown: 0,
            items: []
        }
        this.startTimer = this.startTimer.bind(this)
    }
    oscillator(...freq) {
        let context;
        try {
            context = new (AudioContext || window.webkitAudioContext)();
        }
        catch (e) {
            console.log("Браузер не поддерживает работу с интерфейсом AudioContent")
        }
        //Управление громкостью сигнала
        freq.forEach(elem => {
            this.threads.push(context.createOscillator());
            let vol = context.createGain();

            this.threads[this.threads.length - 1].connect(vol);
            vol.connect(context.destination);

            vol.gain.value = 0.1;

            this.threads[this.threads.length - 1].frequency.value = elem.toString();
            this.threads[this.threads.length - 1].start(0);
        });
        setTimeout(() => this.stopThreads(), 100);
    }
    stopThreads() {
        this.threads.map(elem => elem.stop(0));
        this.threads = [];
    }

    static getDerivedStateFromProps(props, state) {
        return {
            items: props.resource.posts.read()
        }
    }
    componentWillUnmount() {
        clearTimeout(this.state.timeID);
        this.stopThreads();
    }
    pause() {
        //Запуск звукового сигнала паузы между повторениями упражнения или его завершением
        this.oscillator(1633, 941);
        this.setState(
            {timeID: setTimeout(() => {
                this.start();
            }, 1000 * (this.item.time_pause + this.state.step * this.item.delta_time) )
        })
    }
    start() {
        //Запуск звукового сигнала начала повторения упражнения
        this.oscillator(1209, 852);
        this.displayCountDown()
        //Записать id таймера в состояние компонента
        this.setState(
            //После окончания повторения упражнения записать новый шаг и запустить таймер паузы
            {timeID: setTimeout(() => {
                this.setState(state => {
                    return {
                        step: state.step + 1 //Записать увеличение шага на 1 в состояние компонента
                    }
                });
                this.pause();
                //Проверка на количество повторений, которые больше заданного значения
                if (this.state.step >= this.item.count_repeat) {
                    //Отключить таймер и сбросить значение шага и id таймера по умолчанию
                    clearTimeout(this.state.timeID);
                    this.setState({
                        step: 0,
                        timeID: null
                    });
                }
            }, 1000 * this.item.time_progress)
        })
    }
    displayCountDown() {
        this.setState({
            countDown: this.item.time_progress
        })
        let time = setInterval(() => {
            this.setState(state => {
                return {
                    countDown: state.countDown - 1
                }
            });
            if (this.state.countDown <= 0) {
                clearInterval(time)
            }
        }, 1000) 
    }
    startTimer() {
        this.state.timeID || this.start()
    }
    render() {
        try {
            if (this.state.items === "error") 
                throw new Error("Не удается поключиться к json-файлу")
        } catch (e) {
            return <p>{e.message}</p>
        }
        this.item = this.state.items.filter(value => value.link === this.props.match.params.id)[0]
        if (this.items && !this.item) //Проверка на наличие упражнения, указанного в параметре id адресной строки
            return (
                <>
                    <p>Данного упражнения не существует</p>
                    <Link to="/" className="btn btn-primary">Вернуться на главную</Link>
                </>
            )
        return (
            <div className="d-flex ex-wrap">
                <img className="ex-img-top img-thumbnail" src={this.item.img} alt="Здесь рыбы нет"></img>
                <div className="ms-3">
                    <h3>{this.item.title}</h3>
                    <p>{this.item.action}</p>
                    {this.state.timeID ? 
                        <div className="d-flex">
                            <div className="">
                                <small>Время окончания <br />повторения</small>
                                <h1 className="display-3">{this.state.countDown || "❚❚"}</h1>
                            </div>
                            <div className="ms-3">
                                <small>Количество выполненных <br />повторений</small>
                                <h1 className="display-3">{this.state.step}</h1>
                            </div>
                        </div>
                    : ""}

                    <button className="btn btn-primary" onClick={this.startTimer}>▷ Запустить</button>
                    <button className="btn btn-primary ms-3" disabled>❚❚ Приостановить</button>
                </div>  
            </div>
        )
    }
}