package com.gsbizple.wiz.common.filter;

import com.gsbizple.wiz.common.dbcontext.DataSourceContextHolder;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

import static com.gsbizple.wiz.common.constant.CommonConstant.companyKey;

public class HeaderFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {

        String dataSourceKey = request.getHeader(companyKey);

        if (dataSourceKey != null && !dataSourceKey.isEmpty()) {
            DataSourceContextHolder.setDataSourceKey(dataSourceKey);
        }

        try {
            filterChain.doFilter(request, response);
        } finally {
            DataSourceContextHolder.clear();
        }
    }
}

