import React, { Component } from "react";
import CreateProjectButton from "./Project/CreateProjectButton";
import ProjectItem from "./Project/ProjectItem";
import { connect } from "react-redux";
import { getProjects } from "../actions/projectActions";
import PropTypes from "prop-types";

class Dashboard extends Component {
  constructor() {
    super();
    this.state = { projects: [] };
  }

  componentDidMount() {
    this.props.getProjects();
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      this.setState({
        ...this.state,
        projects: this.props.project.projects,
      });
    }
  }

  render() {
    const ProjectComps = this.state.projects.map(
      ({ projectIdentifier, projectName, description, id }) => (
        <ProjectItem
          key={id}
          projectId={projectIdentifier}
          description={description}
          projectName={projectName}
        />
      )
    );

    return (
      <div className="projects">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4 text-center">Projects</h1>
              <br />

              <CreateProjectButton />

              <br />
              <hr />

              {ProjectComps}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getProjects: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, { getProjects })(Dashboard);
