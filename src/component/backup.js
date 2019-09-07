import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import {FieldArray} from 'formik';
import SmartGroupConditionsRow from './SmartGroupConditionsRow';
import {emptyRowCondition} from './SmartGroupConditions';
import styler from '../../../../styler';
import SmartGroupDropDown from './SmartGroupDropDown';

const {Styled} = styler(({add, style}) => {
  add('SmartGroupConditionsGroup', 'div', `
    margin-left: 15px;
  `);
  add('SubConditionGroupContainer', 'div', `
    margin-left: 42px;
    .SmartGroupCondRowContainer::after {
      background: ${style.vars.colors.border};
      box-sizing: border-box;
      content: "";
      display: inline-block;
      width: 36px;
      height: 1px;
      position: relative;
      left: -51px;
      top: -45px;
    }
    @media screen and (max-width: 1450px) {
      .SmartGroupCondRowContainer::after {
      }
    }
  `);
  add('SmartGroupCondRowContainer', 'div', `
  `);
});

function SmartGroupConditionsGroup({
  fieldPrefix,
  expressions,
}) {

  const subConditionContRef = useRef();

  useEffect(()=>{
    console.log('ref');
  });

  return (
    <Styled.SmartGroupConditionsGroup>
      <FieldArray
        name={`${fieldPrefix}`}
        render={({form, insert}) => {
          return expressions.map((expression, idx) => {

            let verticalLineHeight = 0;
            let verticalLineHeightIpad = 0;

            if (expression.expressions) {

              let expressionsLength = 0;

              expression.expressions.forEach(expressionCol => {
                if (!expressionCol.logic) {
                  expressionsLength++;
                }
              });
              if (expressionsLength > 1) {
                verticalLineHeight = (expressionsLength - 1) * 64;
                if (subConditionContRef) {
                  verticalLineHeight = (subConditionContRef.current.clientHeight - 64);
                  verticalLineHeightIpad = subConditionContRef.current.clientHeight - 61;
                }
              }

              return (
                <React.Fragment key={`${fieldPrefix}.${idx}.expressions`}>
                  <SmartGroupDropDown
                    verticalLineHeight={verticalLineHeight}
                    verticalLineHeightIpad={verticalLineHeightIpad}
                    titleText="All"
                    hintText="of the conditions must be true"
                  />
                  <Styled.SubConditionGroupContainer innerRef={subConditionContRef}>
                    <SmartGroupConditionsGroup
                      key={`${fieldPrefix}.${idx}.expressions`}
                      fieldPrefix={`${fieldPrefix}.${idx}.expressions`}
                      expressions={expression.expressions}
                      setFieldValue={form.setFieldValue}
                    />
                  </Styled.SubConditionGroupContainer>
                </React.Fragment>
              );
            }
            function handleAddGroupCondition() {
              insert(idx + 1, {
                logic: 'all',
                expressions: [{...emptyRowCondition}],
              });
            }
            function handleAddRowCondition() {
              insert(idx + 1, {...emptyRowCondition});
            }
            return (
              <Styled.SmartGroupCondRowContainer key={`${fieldPrefix}.${idx}`}>
                <SmartGroupConditionsRow
                  key={`${fieldPrefix}.${idx}`}
                  fieldPrefix={`${fieldPrefix}.${idx}`}
                  expression={expression}
                  setFieldValue={form.setFieldValue}
                  handleAddRowCondition={handleAddRowCondition}
                  handleAddGroupCondition={handleAddGroupCondition}
                />
              </Styled.SmartGroupCondRowContainer>
            );
          });
        }}
      />
    </Styled.SmartGroupConditionsGroup>
  );
}

SmartGroupConditionsGroup.propTypes = {
  fieldPrefix: PropTypes.string.isRequired,
  expressions: PropTypes.array.isRequired,
};

export default SmartGroupConditionsGroup;
