import React from "react";
import axios from 'axios';
import {withRouter} from "react-router-dom";
import { connect } from 'react-redux';
import course_list from 'json-loader!./course.json';
import prof_list from 'json-loader!./profs.json';


class Inputfield extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      inputValue: "",
      courses: []

    }
    this.updateInputValue = this.updateInputValue.bind(this);
    this._handleKeyPress = this._handleKeyPress.bind(this);

  }

  updateInputValue(event) {
    this.setState({inputValue: event.target.value});
  }



  _handleKeyPress(e) {
    if (e.key === 'Enter') {
      console.log(this);
      e.preventDefault();
      //console.log(this);
      var querystring = require('querystring');
      var url;

      if(this.props.state.filters.active)
      {
        var parsed = querystring.parse(this.props.state.filters.url.replace("?",""));
        parsed["q"] = this.state.inputValue;
        url = '/search?'+querystring.stringify(parsed);
      }
      else
      {
        url = '/search?'+querystring.stringify({
            q: this.state.inputValue
        });
      }

        //this.props.history.push(url);
      window.location.href= url;
      console.log(this.props);


    }
  }

  componentDidMount() {
    var courses=course_list.list
    var professors=prof_list.list
     $(document).ready(function(){

       $.widget( "custom.catcomplete", $.ui.autocomplete, {
         _create: function() {
           this._super();
           this.widget().menu( "option", "items", "> :not(.ui-autocomplete-category)" );
         },
         _renderMenu: function( ul, items ) {
           var that = this,
             currentCategory = "";
           $.each( items, function( index, item ) {
             var li;
             if ( item.category != currentCategory ) {
               ul.append( "<li class='ui-autocomplete-category'>" + item.category + "</li>" );
               currentCategory = item.category;
             }
             li = that._renderItemData( ul, item );
             if ( item.category ) {
               li.attr( "aria-label", item.category + " : " + item.label );
             }
           });
         }
       });

       $( "#search" ).catcomplete({
         delay: 0,
         source: function(request,response){
           var filtered_profs=Array.from($.ui.autocomplete.filter(professors,request.term).slice(0,5));
           var filtered_course=Array.from($.ui.autocomplete.filter(courses,request.term).slice(0,5));

           console.log(courses);
           console.log(professors);
           console.log(filtered_course);
           console.log(filtered_profs);
           response(filtered_course.concat(filtered_profs))

         }
       });
    });

  }


  render() {
    console.log(this.props.search);
    if(this.props.search)
    {
      var icon="material-icons inputIconOverride2";
      var height="36px";
    }
    else
    {
      var icon="material-icons inputIconOverride";
      var height="inherit"
    }
    return (
      <div className="input-field" style={{height: "54px", lineHeight:"40px"}}>
        <input
          id="search"
          type="search"
          className="autocomplete"
          placeholder="Search courses or professors"
          required
          autoComplete ="off"
          value={this.state.inputValue.bind}
          onChange={this.updateInputValue}
          onKeyPress={this._handleKeyPress}
          style={{marginTop:10, height:height, backgroundColor:"#eeeeee", borderRadius:5, border:".5px solid gainsboro"}}
        />
        <label
          className="label-icon hide-on-small-only inputOverride"
          htmlFor="search"
        >
          <i
            className={icon} style={{lineHeight: "54px"}}
          >
            search
          </i>
        </label>
        <label
          className="label-icon hide-on-med-and-up inputOverride"
          htmlFor="search"
        >
          <i
            className={icon} style={{lineHeight: "54px", bottom:20, paddingLeft: 10}}
          >
            search
          </i>
        </label>

      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return{
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
  }
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(Inputfield));
