import { useState } from "react";
import PropTypes from "prop-types";

import {
  Autocomplete as MuiAutocomplete,
  createFilterOptions,
  TextField,
  ListItem,
  Avatar,
  Chip,
  Checkbox,
  Radio,
} from "@mui/material";

import { mdiChevronDown, mdiPlusBoxOutline } from "@mdi/js";

import Icon from "../Icon";
import IconText from "../IconText";

const filter = createFilterOptions();

function Autocomplete({
  name,
  label,
  required,
  placeholder,
  disabled,
  fixedValue,
  size,

  icon,

  isSolo,
  isMulti,

  options,
  noOptionsText,

  isCreatable,
  createText,
  onCreate,

  inputRef,

  value,
  onChange,
  onBlur,
  onFocus,

  error,
  helperText,

  ...restProps
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);

  const filterOptions = (options, params) => {
    const filtered = filter(options, params);

    // if not found in provided option, indicate this
    if (!!params.inputValue && !filtered.length && isCreatable) {
      return [{ notFound: true, label: params.inputValue }];
    }

    return filtered;
  };

  const renderChip = (option, isDeletable) => {
    const avatar = !!option.img && (
      <Avatar
        alt={option.label}
        src={option.img}
        variant={option.imgVariant || "circular"}
      />
    );

    const handleDelete = () => {
      const selectedValue = isMulti
        ? value.filter((v) => option.value !== v)
        : "";
      onChange({ target: { name, value: selectedValue } });
    };

    return (
      <Chip
        key={option.value}
        size={size}
        label={option.label}
        avatar={avatar || null}
        onDelete={isDeletable && !disabled && !fixedValue ? handleDelete : null}
        variant={fixedValue ? "outlined" : "filled"}
        {...(fixedValue && { sx: { backgroundColor: "white" } })}
      />
    );
  };
  const renderOption = (liProps, option, { selected }) => {
    return (
      <ListItem {...liProps} key={option.value || "notFound"}>
        {option.notFound ? (
          <IconText
            text={`${createText} "${option.label}"`}
            textVariant="body1"
            textColor="primary"
            icon={mdiPlusBoxOutline}
            iconSize="small"
            iconColor="primary"
          />
        ) : isSolo || isMulti ? (
          <>
            {isMulti ? (
              <Checkbox size="small" checked={selected} />
            ) : isSolo ? (
              <Radio size="small" checked={selected} />
            ) : null}

            {renderChip(option, false)}
          </>
        ) : (
          option.label
        )}
      </ListItem>
    );
  };

  const handleAutocompleteChange = (_, value) => {
    // if not found handle create on select
    if (isMulti || isSolo ? value[0]?.notFound : value?.notFound) {
      onCreate(isMulti || isSolo ? value[0].label : value.label);
      return;
    }

    const selectedValue = isMulti
      ? value.map((i) => i.value) // array of option values
      : isSolo
      ? value.pop()?.value || "" // option value
      : value?.value || ""; // option value

    const fakeEvent = { target: { name, value: selectedValue } };
    onChange(fakeEvent);
  };
  const getAutocompleteValue = () => {
    return isMulti
      ? options.filter((opt) => value?.indexOf(opt.value) > -1)
      : isSolo
      ? options.filter((opt) => opt.value === value)
      : options.find((opt) => opt.value === value) || null;
  };

  return (
    <MuiAutocomplete
      ref={inputRef}
      fullWidth
      disablePortal
      autoHighlight
      autoComplete
      openOnFocus
      clearOnBlur
      includeInputInList
      handleHomeEndKeys
      disableCloseOnSelect={isMulti}
      options={options}
      noOptionsText={noOptionsText}
      multiple={isMulti || isSolo}
      filterOptions={filterOptions}
      isOptionEqualToValue={(opt, val) => opt.value === val.value}
      getOptionDisabled={(opt) => opt.disabled}
      getOptionLabel={(opt) => opt.label}
      renderOption={renderOption}
      renderTags={(value) => value.map((opt) => renderChip(opt, true))}
      size={size || "medium"}
      disabled={disabled || fixedValue}
      popupIcon={<Icon icon={mdiChevronDown} />}
      renderInput={(params) => (
        <TextField
          {...params}
          name={name}
          label={label}
          required={required}
          variant="outlined"
          placeholder={placeholder || ""}
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            startAdornment: ((isMulti ? !!value.length : !!value) ||
              isOpen ||
              isInputFocused) && (
              <>
                {!!icon && (
                  <Icon
                    icon={icon}
                    color="action"
                    size={size === "small" ? "small" : "medium"}
                    sx={{ ml: "4px", mr: "4px" }}
                  />
                )}
                {params.InputProps.startAdornment}
              </>
            ),
            componentsProps: {
              root: {
                sx: {
                  borderRadius: "4px",
                  backgroundColor:
                    disabled || fixedValue ? "greyScale.100" : "white",
                },
              },
            },
          }}
        />
      )}
      open={isOpen}
      onOpen={() => setIsOpen(true)}
      onClose={() => setIsOpen(false)}
      value={getAutocompleteValue()}
      onChange={handleAutocompleteChange}
      onBlur={(e) => {
        setIsInputFocused(false);
        !!onBlur && onBlur(e);
      }}
      onFocus={(e) => {
        setIsInputFocused(true);
        !!onFocus && onFocus(e);
      }}
      {...restProps}
    />
  );
}

Autocomplete.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  fixedValue: PropTypes.bool,
  size: PropTypes.oneOf(["small", "medium"]),

  icon: PropTypes.string,

  isSolo: PropTypes.bool,
  isMulti: PropTypes.bool,

  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      img: PropTypes.string,
      imgVariant: PropTypes.oneOf(["circular", "square", "rounded"]),
      disabled: PropTypes.bool,
    })
  ).isRequired,
  noOptionsText: PropTypes.string,

  isCreatable: PropTypes.bool,
  createText: PropTypes.string,
  onCreate: PropTypes.func,

  inputRef: PropTypes.object,

  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,

  error: PropTypes.bool,
  helperText: PropTypes.string,
};

export default Autocomplete;
