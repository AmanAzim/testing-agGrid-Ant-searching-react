import React from 'React';
import UI from '../../../UI';
import styler from '../../../../styler';

const {Styled} = styler(({add, style}) => {
  add('DropDownContainer', 'div', ({verticalLineHeight})=> `
    margin-bottom: 28px;
    width: 16px;
    height: 22px;
    font-family: Arial;
    font-size: 1.4rem;
    line-height: 1.57;
    color: ${style.vars.colors.granite};
    &::after {
      content: '';
      display: block;
      width: 1px;
      height: ${32 + verticalLineHeight}px;
      position: relative;
      top: 0px;
      left: 6px;
      background: ${style.vars.colors.border};
    }
  `);
  add('ArrowDown', UI.Icon, `
    font-size: 1.2rem;
    margin-left: 8px;
    width: 11px;
    height: 6px;
    display: inline-block;
  `);
  add('ConditionHint', 'p', `
    margin-left: 8px;
    width: 184px;
    height: 18px;
    font-family: Arial;
    font-size: 1.4rem;
    line-height: 1.29;
    color: ${style.vars.colors.severity.info};
    display: inline-block;
  `);
});

const SmartGroupDropDown = ({titleText, hintText, verticalLineHeight}) =>{
  const menu = (
    <UI.Menu>
      <UI.MenuItem key="0">
        1st menu item
      </UI.MenuItem>
      <UI.MenuItem key="1">
        2nd menu item
      </UI.MenuItem>
      <UI.MenuItem key="3">
                3rd menu item
      </UI.MenuItem>
    </UI.Menu>
  );

  return (
    <Styled.DropDownContainer verticalLineHeight={verticalLineHeight} >
      {titleText}
      <UI.Dropdown overlay={menu} trigger={['click']}>
        <Styled.ArrowDown type="down" />
      </UI.Dropdown>
      <Styled.ConditionHint>{hintText}</Styled.ConditionHint>
    </Styled.DropDownContainer>
  );
};

export default SmartGroupDropDown;
