import React, { Component } from "react";
// import { connect } from "react-redux";
import {} from "../../actions/usersAction";
import Slider from "react-slick";
export default class Stages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      recommendations: [
        {
          message: "Très bon élément qui travaille bien !",
          from: "Employeur 1"
        },
        {
          message:
            "Elément indispensable à notre équipe tout le temps où il était avec nous",
          from: "Employeur 2"
        },
        {
          message: "Elément indispensable !",
          from: "Employeur 3"
        }
      ],
      stages: [
        {
          title: "Développeur full stack",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie pulvinar euismod. Suspendisse eget orci eget felis interdum maximus ac at nulla. Sed laoreet orci eu aliquam vehicula. Duis volutpat cursus massa et auctor. Fusce lobortis purus vel dolor congue sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius neque purus, feugiat accumsan purus bibendum quis. Praesent pulvinar sit amet justo eget vestibulum. Maecenas at faucibus dolor, nec varius quam.",
          name: "JOB Tech",
          dates: "01/01/2019 - 07/01/2019"
        },
        {
          title: "Développeur full stack",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie pulvinar euismod. Suspendisse eget orci eget felis interdum maximus ac at nulla. Sed laoreet orci eu aliquam vehicula. Duis volutpat cursus massa et auctor. Fusce lobortis purus vel dolor congue sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius neque purus, feugiat accumsan purus bibendum quis. Praesent pulvinar sit amet justo eget vestibulum. Maecenas at faucibus dolor, nec varius quam.",
          name: "JOB Tech",
          dates: "01/01/2019 - 07/01/2019"
        },
        {
          title: "Développeur full stack",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam molestie pulvinar euismod. Suspendisse eget orci eget felis interdum maximus ac at nulla. Sed laoreet orci eu aliquam vehicula. Duis volutpat cursus massa et auctor. Fusce lobortis purus vel dolor congue sagittis. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius neque purus, feugiat accumsan purus bibendum quis. Praesent pulvinar sit amet justo eget vestibulum. Maecenas at faucibus dolor, nec varius quam.",
          name: "JOB Tech",
          dates: "01/01/2019 - 07/01/2019"
        }
      ]
    };
  }
  render() {
    const settings = {
      adaptiveHeight: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true
          }
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2
          }
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    };
    let recommendTab = this.state.recommendations.map(
      (recommendation, index) => (
        <div key={index}>
          <blockquote className="flex-column flex-center">
            <p>{recommendation.message}</p>
            <i>{recommendation.from}</i>
          </blockquote>
        </div>
      )
    );
    let stagesTab = this.state.stages.map((stage, index) => (
      <li className="flex-column stage-li" key={index}>
        <h6>{stage.title}</h6>
        <p>{stage.name}</p>
        <p>{stage.description}</p>
        <p>{stage.dates}</p>
      </li>
    ));
    return (
      <div className="stages-container flex-row ">
        <div className="user-left-infos">
          <div className="flex-column flex-center">
            <img src={require("../../assets/logo.png")} alt="profile-pic" />
            <a href="http://localhost:9000/fiches-renseignements/user-fiche.pdf">
              Fiche de renseignement
            </a>
            <a href="http://localhost:9000/conventions/user-convention.pdf">
              Convention de stage
            </a>
            <a href="http://localhost:9000/conventions/user-convention.pdf">
              Lettres de recommandations
            </a>
          </div>
        </div>
        <div className="user-right-infos">
          <div className="flex-column flex-center">
            <h3 className="stage-title">NOM PRENOM</h3>
            <p>
              <i>Administrateur</i>
            </p>
          </div>
          <hr />
          <div className="stages-list">
            <h3 className="stage-title">Listes de stages</h3>
            <ul>{stagesTab}</ul>
          </div>
          <hr />
          <div className="stages-list">
            <h3 className="stage-title" style={{ marginBottom: "2vh" }}>
              Recommandations
            </h3>
            <div className="recommend-wrapper">
              <Slider {...settings}>{recommendTab}</Slider>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
