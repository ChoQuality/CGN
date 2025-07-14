package com.gsbizple.wiz.common.dto.view;

import com.gsbizple.wiz.common.constant.view.ContextType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class LayoutDto<D> {
    private final ContextType contextType;
    private final D data;
}
