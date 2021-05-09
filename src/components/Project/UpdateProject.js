import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateProject, getProject } from "../../actions/projectActions";
import classname from "classname";

class UpdateProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      projectName: "",
      projectIdentifier: "",
      description: "",
      start_date: "",
      end_date: "",
      errors: {},
    };
  }

  componentDidMount() {
    const { projectId } = this.props.match.params;
    this.props.getProject(projectId, this.props.history);
  }

  componentDidUpdate(prevProps) {
    if (prevProps !== this.props) {
      const { project, errors } = this.props;

      if (Object.keys(errors).length > 0) {
        this.setState({
          ...this.state,
          errors: this.props.errors,
        });
      } else {
        this.setState({
          ...this.state,
          id: project.id,
          projectName: project.projectName,
          projectIdentifier: project.projectIdentifier,
          description: project.description,
          start_date: project.start_date,
          end_date: project.end_date,
        });
      }
    }
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const updatedProject = {
      id: this.state.id,
      projectName: this.state.projectName,
      projectIdentifier: this.state.projectIdentifier,
      description: this.state.description,
      start_date: this.state.start_date,
      end_date: this.state.end_date,
    };
    this.props.updateProject(updatedProject, this.props.history);
  }

  render() {
    const { errors } = this.state;

    let projectNameWarningComp = errors.projectName && (
      <div className="alert alert-danger" role="alert">
        {errors.projectName}
      </div>
    );
    let projectIdWarningComp = errors.projectIdentifier && (
      <div className="alert alert-danger" role="alert">
        {errors.projectIdentifier}
      </div>
    );
    let projecDescWarningComp = errors.description && (
      <div className="alert alert-danger" role="alert">
        {errors.description}
      </div>
    );

    return (
      <div className="project">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h5 className="display-4 text-center">Edit Project form</h5>
              <hr />
              <form onSubmit={this.onSubmit.bind(this)}>
                <div className="form-group">
                  <input
                    type="text"
                    className={classname("form-control form-control-lg", {
                      "is-invalid": errors.projectName,
                    })}
                    placeholder="Project Name"
                    onChange={this.onChange.bind(this)}
                    name="projectName"
                    value={this.state.projectName}
                  />
                  {projectNameWarningComp}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    className={classname("form-control form-control-lg", {
                      "is-invalid": errors.projectIdentifier,
                    })}
                    placeholder="Unique Project ID"
                    disabled
                    onChange={this.onChange.bind(this)}
                    name="projectIdentifier"
                    value={this.state.projectIdentifier}
                  />
                  {projectIdWarningComp}
                </div>
                <div className="form-group">
                  <textarea
                    className={classname("form-control form-control-lg", {
                      "is-invalid": errors.description,
                    })}
                    placeholder="Project Description"
                    onChange={this.onChange.bind(this)}
                    name="description"
                    value={this.state.description}
                  ></textarea>
                  {projecDescWarningComp}
                </div>
                <h6>Start Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    onChange={this.onChange.bind(this)}
                    name="start_date"
                    value={this.state.start_date ?? ""}
                  />
                </div>
                <h6>Estimated End Date</h6>
                <div className="form-group">
                  <input
                    type="date"
                    className="form-control form-control-lg"
                    onChange={this.onChange.bind(this)}
                    name="end_date"
                    value={this.state.end_date ?? ""}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-primary btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UpdateProject.propTypes = {
  updateProject: PropTypes.func.isRequired,
  getProject: PropTypes.func.isRequired,
  project: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    errors: state.errors,
    project: state.project.project,
  };
};

export default connect(mapStateToProps, { getProject, updateProject })(
  UpdateProject
);
